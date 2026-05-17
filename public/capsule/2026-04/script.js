(() => {
  'use strict';

  const STORAGE_KEY = 't-club-capsule-2026-04-review-v1';
  const COMMENT_DEBOUNCE_MS = 1500;

  const REACTIONS = [
    { id: 'agree',     label: 'Согласна' },
    { id: 'disagree',  label: 'Не согласна' },
    { id: 'confused',  label: 'Не зашло' }
  ];

  const SECTION_LABELS = {
    cover: 'Заходное письмо',
    arc: 'Что мы прошли вместе',
    rituals: 'Сквозные ритуалы',
    practice: 'Практика апреля — 7 дней действий',
    guest: 'Гость месяца — Кристина (инструменты)',
    diary: 'Дневник Ляйсан',
    vignette: 'Холодильник как символ (Юля + Ксения)',
    book: 'Книга и цитаты Гессе',
    voices: 'Голоса месяца',
    insight: 'Инсайт месяца'
  };

  // ─── State ───────────────────────────────────────

  const state = loadState();

  function loadState() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    } catch { return {}; }
  }

  function saveState() {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); }
    catch {}
  }

  // ─── Networking ──────────────────────────────────

  async function postFeedback(payload) {
    const res = await fetch('/api/feedback', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || `http_${res.status}`);
    }
    return res.json();
  }

  // ─── Toast ───────────────────────────────────────

  const toastEl = document.getElementById('toast');
  let toastTimer = null;

  function showToast(text) {
    if (!toastEl) return;
    toastEl.textContent = text;
    toastEl.classList.add('is-visible');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toastEl.classList.remove('is-visible'), 1800);
  }

  // ─── Per-section feedback widget ─────────────────

  function buildFeedbackWidget(sectionKey) {
    const wrap = document.createElement('div');
    wrap.className = 'feedback';
    wrap.setAttribute('data-feedback-widget', sectionKey);

    const label = document.createElement('p');
    label.className = 'feedback-label';
    label.textContent = 'Как читается этот блок';
    wrap.appendChild(label);

    const buttonsRow = document.createElement('div');
    buttonsRow.className = 'feedback-buttons';

    const sectionState = state[sectionKey] || {};

    REACTIONS.forEach(r => {
      const btn = document.createElement('button');
      btn.className = 'feedback-btn';
      btn.type = 'button';
      btn.textContent = r.label;
      btn.setAttribute('aria-pressed', sectionState.reaction === r.id ? 'true' : 'false');
      btn.dataset.reaction = r.id;
      btn.addEventListener('click', () => handleReaction(sectionKey, r.id, wrap));
      buttonsRow.appendChild(btn);
    });

    wrap.appendChild(buttonsRow);

    const toggle = document.createElement('button');
    toggle.className = 'feedback-comment-toggle';
    toggle.type = 'button';
    toggle.textContent = sectionState.comment ? 'изменить заметку' : 'оставить заметку →';
    wrap.appendChild(toggle);

    const commentBox = document.createElement('div');
    commentBox.className = 'feedback-comment';
    if (sectionState.comment) commentBox.classList.add('is-open');

    const textarea = document.createElement('textarea');
    textarea.className = 'feedback-textarea';
    textarea.placeholder = 'твоя заметка…';
    textarea.value = sectionState.comment || '';
    textarea.rows = 3;
    commentBox.appendChild(textarea);

    const status = document.createElement('p');
    status.className = 'feedback-status';
    commentBox.appendChild(status);

    wrap.appendChild(commentBox);

    toggle.addEventListener('click', () => {
      const isOpen = commentBox.classList.toggle('is-open');
      if (isOpen) textarea.focus();
    });

    let commentTimer = null;
    textarea.addEventListener('input', () => {
      clearTimeout(commentTimer);
      status.textContent = '';
      status.className = 'feedback-status';
      commentTimer = setTimeout(() => handleComment(sectionKey, textarea.value, wrap), COMMENT_DEBOUNCE_MS);
    });
    textarea.addEventListener('blur', () => {
      clearTimeout(commentTimer);
      handleComment(sectionKey, textarea.value, wrap);
    });

    return wrap;
  }

  function setStatus(wrap, text, kind) {
    const status = wrap.querySelector('.feedback-status');
    if (!status) return;
    status.textContent = text;
    status.className = 'feedback-status' + (kind ? ' is-' + kind : '');
  }

  async function handleReaction(sectionKey, reactionId, wrap) {
    const prev = state[sectionKey] || {};
    const isToggleOff = prev.reaction === reactionId;
    const newReaction = isToggleOff ? null : reactionId;

    state[sectionKey] = { ...prev, reaction: newReaction };
    saveState();

    wrap.querySelectorAll('.feedback-btn').forEach(btn => {
      btn.setAttribute('aria-pressed', btn.dataset.reaction === newReaction ? 'true' : 'false');
    });

    if (!newReaction) return;

    try {
      await postFeedback({
        section: SECTION_LABELS[sectionKey] || sectionKey,
        section_key: sectionKey,
        reaction: newReaction,
        comment: prev.comment || ''
      });
      showToast('Сохранено');
    } catch (err) {
      console.error(err);
      showToast('Не удалось отправить');
    }
  }

  async function handleComment(sectionKey, value, wrap) {
    const prev = state[sectionKey] || {};
    const trimmed = value.trim();

    if ((prev.comment || '') === trimmed) return;

    state[sectionKey] = { ...prev, comment: trimmed };
    saveState();

    const toggle = wrap.querySelector('.feedback-comment-toggle');
    if (toggle) {
      toggle.textContent = trimmed ? 'изменить заметку' : 'оставить заметку →';
    }

    if (!trimmed) {
      setStatus(wrap, '');
      return;
    }

    setStatus(wrap, 'Отправляем…');

    try {
      await postFeedback({
        section: SECTION_LABELS[sectionKey] || sectionKey,
        section_key: sectionKey,
        reaction: prev.reaction || null,
        comment: trimmed,
        kind: 'comment_update'
      });
      setStatus(wrap, 'Сохранено', 'saved');
    } catch (err) {
      console.error(err);
      setStatus(wrap, 'Не удалось отправить', '');
    }
  }

  // ─── Mount widgets ───────────────────────────────

  document.querySelectorAll('[data-fb]').forEach(section => {
    const key = section.getAttribute('data-fb');
    if (!key) return;
    section.appendChild(buildFeedbackWidget(key));
  });

  // ─── Value pulse ─────────────────────────────────

  const vpSubmit = document.querySelector('[data-vp-submit]');
  const vpStatus = document.querySelector('[data-vp-status]');
  const vpSectionsBox = document.querySelector('[data-vp-sections]');
  const vpConsent = document.querySelector('[data-vp-consent]');
  const vpPrice = document.querySelector('[data-vp-price]');
  const vpComment = document.querySelector('[data-vp-comment]');

  // Restore vp state
  const vpState = state.__vp || {};
  if (vpState.sections && vpSectionsBox) {
    vpSectionsBox.querySelectorAll('input[type="checkbox"]').forEach(cb => {
      if (vpState.sections.includes(cb.value)) cb.checked = true;
    });
  }
  if (vpState.consent && vpConsent) vpConsent.value = vpState.consent;
  if (vpState.price && vpPrice) vpPrice.value = vpState.price;
  if (vpState.comment && vpComment) vpComment.value = vpState.comment;

  function readVp() {
    const sections = vpSectionsBox
      ? Array.from(vpSectionsBox.querySelectorAll('input[type="checkbox"]:checked')).map(cb => SECTION_LABELS[cb.value] || cb.value)
      : [];
    return {
      sections,
      consent: vpConsent ? vpConsent.value.trim() : '',
      price: vpPrice ? vpPrice.value.trim() : '',
      comment: vpComment ? vpComment.value.trim() : ''
    };
  }

  function setVpStatus(text, kind) {
    if (!vpStatus) return;
    vpStatus.textContent = text;
    vpStatus.className = 'vp-status' + (kind ? ' is-' + kind : '');
  }

  if (vpSubmit) {
    vpSubmit.addEventListener('click', async () => {
      const vp = readVp();
      const isEmpty = vp.sections.length === 0 && !vp.price && !vp.comment && !vp.consent;
      if (isEmpty) {
        setVpStatus('Заполни хотя бы один пункт', '');
        return;
      }

      state.__vp = vp;
      saveState();

      setVpStatus('Отправляем…');
      vpSubmit.disabled = true;

      try {
        await postFeedback({
          section: 'value_pulse',
          kind: 'value_pulse',
          value_pulse: vp
        });
        setVpStatus('Спасибо, обратная связь сохранена', 'saved');
        showToast('Отправлено');
      } catch (err) {
        console.error(err);
        setVpStatus('Не удалось отправить — попробуй ещё раз', '');
      } finally {
        vpSubmit.disabled = false;
      }
    });
  }

  // Auto-save vp inputs to localStorage on edit (so navigating doesn't lose comment)
  [vpConsent, vpPrice, vpComment].forEach(el => {
    if (!el) return;
    el.addEventListener('input', () => {
      state.__vp = readVp();
      saveState();
    });
  });
  if (vpSectionsBox) {
    vpSectionsBox.addEventListener('change', () => {
      state.__vp = readVp();
      saveState();
    });
  }

})();
