import Game from '@/components/student/Game';

const securityHacking = {
  id: "securityHacking",
  title: "Security Hacking",
  challenges: [
    {
      level: 1,
      title: "Crack the Password",
      description: "Find the correct password using the given data.",
      task: "Write a function that cracks the password.",
      data: ["12345", "password123", "hackme"],
      solution: "password123",
      defaultCode: "function solve(data) { return ''; }",
      xp: 50
    }
  ]
};

export default function Home() {
  return (
    <div>
      <Game gameData={securityHacking} />
    </div>
  );
}
