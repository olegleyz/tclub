import { useParams } from 'react-router-dom';
import { useMonth } from '../hooks/useContent';
import CapsuleLayout from '../components/capsule/CapsuleLayout';
import AprilCapsule from '../components/capsule/AprilCapsule';

export default function CapsulePage() {
  const { monthId } = useParams<{ monthId: string }>();
  const month = useMonth(monthId);

  if (!month) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-16">
        <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!month.capsule?.available) {
    return (
      <main className="pt-24 pb-20 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-text">Капсула для этого месяца пока не опубликована.</p>
        </div>
      </main>
    );
  }

  let capsuleContent;
  if (monthId === '2026-04') {
    capsuleContent = <AprilCapsule />;
  } else {
    capsuleContent = (
      <p className="text-text text-center">
        Капсула этого месяца скоро будет здесь.
      </p>
    );
  }

  return <CapsuleLayout month={month}>{capsuleContent}</CapsuleLayout>;
}
