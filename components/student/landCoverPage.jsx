import Image from 'next/image';

export default function CoverImage() {
  return (
    <div className="relative w-full h-64 md:h-96">
      <Image
        src="/images/coverpage1.png" // Ensure this path is correct
        alt="Dashboard Cover"
        layout="fill"
        objectFit="cover"
        quality={100}
        priority
      />
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(to bottom, transparent, #FFF5EE)',
          opacity: 0.8,
        }}
      ></div>
      <div className="absolute inset-0 flex items-center justify-center">
        {/* Additional content can be added here */}
      </div>
    </div>
  );
}
