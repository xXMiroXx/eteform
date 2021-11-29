import Image from "next/image";
import Link from "next/link";

export default function Logo({ className }: { className: string }) {
  return (
    <div className={className}>
      <Link href="/">
        <a>
          <Image
            src="/images/logo.png"
            alt="logo"
            layout="responsive"
            width="5"
            height="4"
          />
        </a>
      </Link>
    </div>
  );
}
