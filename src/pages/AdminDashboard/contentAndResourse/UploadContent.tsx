import CommonWrapper from "@/common/CommonWrapper";
import TabList from "@/components/admin_Content & Resource/Tab/TabList";
import Upload_Content_Header from "@/components/admin_Content & Resource/Upload_Content_Header";

const UploadContent = () => {
  return (
    <>
      <CommonWrapper>
        <Upload_Content_Header />
        <TabList />
      </CommonWrapper>
    </>
  );
};

export default UploadContent;
