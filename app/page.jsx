import Image from 'next/image';

export default function Page() {
  return (
    <div className="md:w-1/2">
      <img
        src="/hero-image.png"
        alt="Hero Image"
        className="w-full h-auto"
      />
    </div>
  );
} 