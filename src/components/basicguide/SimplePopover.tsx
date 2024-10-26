import { Button, Dialog, DialogTrigger, Popover } from "react-aria-components";

export default function SimplePopover() {
  return (
    <DialogTrigger>
      <Button className="px-4 py-2 bg-blue-500 text-white rounded">
        ポップオーバーを開く
      </Button>
      <Popover>
        <Dialog className="p-4 bg-white shadow-lg rounded">
          これはポップオーバーのコンテンツです。
        </Dialog>
      </Popover>
    </DialogTrigger>
  );
}
