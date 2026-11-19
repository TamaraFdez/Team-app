import DeclineButton from '../components/recruit/Decline-button';
import RecruitButton from '../components/recruit/RecruitButton';
import RecruitCard from '../components/recruit/RecruitCard';
import '../styles/recruit.css';

export default function Reclutar() {
  return (
    <div className="recruit-container">
      <DeclineButton />
      <RecruitCard
        name="A-Bomb"
        aka="Richard Milhouse Jones"
        height="203 cm"
        weight="441 kg"
        imgSrc="https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/lg/1-a-bomb.jpg"
        stats={{
          intelligence: 38,
          strength: 100,
          speed: 17,
          durability: 80,
          power: 24,
          combat: 64
        }}
      />
      <RecruitButton />
    </div>
  );
}
