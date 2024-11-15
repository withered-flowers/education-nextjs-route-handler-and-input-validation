import homepageFun from "@/animations/homepage-fun.json";
import ClientLottieReact from "@/components/lottie-client/ClientLottieReact";

import Link from "next/link";

export default function Home() {
	return (
		<>
			<section className="flex h-screen w-full flex-col items-center justify-center gap-4">
				<ClientLottieReact animationData={homepageFun} className="h-48 w-48" />
				<section>
					<h1 className="text-3xl font-semibold text-gray-700">Navigation</h1>
				</section>
				<section className="flex flex-row gap-4">
					<Link
						className="text-blue-400 underline underline-offset-4 transition-colors duration-300 hover:text-blue-600"
						href="/"
					>
						Home
					</Link>
					<Link
						className="text-blue-400 underline underline-offset-4 transition-colors duration-300 hover:text-blue-600"
						href="/about"
					>
						About
					</Link>
					<Link
						className="text-blue-400 underline underline-offset-4 transition-colors duration-300 hover:text-blue-600"
						href="/dashboard/jokes"
					>
						Dashboard (Jokes)
					</Link>
				</section>
			</section>
		</>
	);
}
