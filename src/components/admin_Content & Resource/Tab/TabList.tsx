import Tabs from "../Tab/Tabs";
import Component_Resource_Question_Bank from "@/components/admin_content_res/Question_Bank/Content_Resource_Question_Bank";
import Upload_Flashcard from "@/components/admin_content_res/Flash_Card/Upload_Flashcard";
import OSCE_Homepage from "@/components/admin_content_res/OSCE/OSCE_Homepage";

function TabList() {
  const tabs = [
    {
      label: "Question Bank",
      content: <Component_Resource_Question_Bank />,
    },
    {
      label: "Flashcard",
      content: <Upload_Flashcard />,
    },
    {
      label: "Clinical Case",
      content: <p>Clinical Case</p>,
    },
    {
      label: "OSCE",
      content: <OSCE_Homepage />,
    },
    {
      label: "Notes",
      content: <p>Notes</p>,
    },
    {
      label: "Career Resource",
      content: <p>Career Resource</p>,
    },
  ];

  return (
    <div className="">
      <Tabs tabs={tabs} />
    </div>
  );
}

export default TabList;
