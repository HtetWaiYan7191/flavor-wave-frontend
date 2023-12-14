import { Button } from "../ui/button";
import Moodle from "./moodleComponent";

export default function ConfirmMoodle({
  hide,
  onSubmit,
  confirmText,
  submitText,
  moodleButtonName,
}) {
  return (
    <>
      <Moodle buttonName={moodleButtonName}>
        <section className=" relative p-2 flex justify-center min-w-[40vw] min-h-[35vh] items-center">
          <h3>{confirmText}</h3>
          <Button className="absolute bottom-1 right-0" onClick={onSubmit}>
            {submitText}
          </Button>
        </section>
      </Moodle>
    </>
  );
}
