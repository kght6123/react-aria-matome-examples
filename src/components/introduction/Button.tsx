import { Button } from "react-aria-components";

export default function App() {
	return (
		<Button
			onPress={() => alert("Button clicked!")}
			className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700"
		>
			Click me
		</Button>
	);
}
