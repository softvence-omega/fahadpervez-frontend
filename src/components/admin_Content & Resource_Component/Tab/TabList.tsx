import Tabs from "./Tabs";
import Component_Resource_Question_Bank from "@/components/admin_content_and_resource_page/Question_Bank/Question_Bank_Homepage";
import Upload_Flashcard from "@/components/admin_content_and_resource_page/Flash_Card/Upload_Flashcard";
import OSCE_Homepage from "@/components/admin_content_and_resource_page/OSCE/OSCE_Homepage";
import Notes_HomePage from "@/components/admin_content_and_resource_page/Notes/Notes_HomePage";
import Career_Resource_Homepage from "@/components/admin_content_and_resource_page/Career Resource/Career_Resource_Homepage";
import Clinical_Case_Homepage from "@/components/admin_content_and_resource_page/Clinical Case/Clinical_Case_Homepage";

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
      content: <Clinical_Case_Homepage />,
    },
    {
      label: "OSCE",
      content: <OSCE_Homepage />,
    },
    {
      label: "Notes",
      content: <Notes_HomePage />,
    },
    {
      label: "Career Resource",
      content: <Career_Resource_Homepage />,
    },
  ];

  return (
    <div className="">
      <Tabs tabs={tabs} />
    </div>
  );
}

export default TabList;
