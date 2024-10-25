import {
	Button,
	Dialog,
	DialogTrigger,
	Heading,
	Modal,
	ModalOverlay,
} from "react-aria-components";

export default function SimpleModal() {
	return (
		<DialogTrigger>
			<Button className="px-4 py-2 bg-blue-500 text-white rounded">
				モーダルを開く
			</Button>
			<ModalOverlay className="fixed inset-0 z-10 overflow-y-auto bg-black/25 flex min-h-full items-center justify-center p-4 text-center backdrop-blur">
				<Modal className="w-full max-w-md overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl">
					<Dialog className="outline-none relative">
						{({ close }) => (
							<>
								<Heading
									slot="title"
									className="text-xxl font-semibold leading-6 my-0 text-slate-700"
								>
									モーダルタイトル
								</Heading>
								<p className="mt-4">モーダルの内容がここに表示されます。</p>
								<Button
									onPress={close}
									className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
								>
									閉じる
								</Button>
							</>
						)}
					</Dialog>
				</Modal>
			</ModalOverlay>
		</DialogTrigger>
	);
}
