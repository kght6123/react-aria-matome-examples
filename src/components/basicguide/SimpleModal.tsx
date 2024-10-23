import { Button, Dialog, DialogTrigger, Modal } from "react-aria-components";

export default function SimpleModal() {
	return (
		<DialogTrigger>
			<Button className="px-4 py-2 bg-blue-500 text-white rounded">
				モーダルを開く
			</Button>
			<Modal>
				<Dialog className="fixed inset-0 bg-white p-6 shadow-lg rounded-lg">
					{({ close }) => (
						<>
							<h2 className="text-xl font-bold">モーダルタイトル</h2>
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
		</DialogTrigger>
	);
}
