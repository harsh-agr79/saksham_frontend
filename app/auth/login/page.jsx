import { LoginForm} from "@/components/auth/loginForm";

export default function Home() {
  const { API_KEY } = process.env

  return (
    <div>
        <LoginForm apiKey={API_KEY}/>
    </div>
  );
}
