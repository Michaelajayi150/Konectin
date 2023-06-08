import { useTemplateContext } from "../../../../contexts/resume";

const TemplateOption = ({ templateId, image }) => {
  const { setSelectedTemplate } = useTemplateContext();

  const handleSelect = (id) => {
    setSelectedTemplate(id);
  };

  return (
    <div onClick={() => handleSelect(templateId)}>
      <img
        src={image}
        className=" h-[313px]  lg:h-[535px] lg:w-[379px]"
        alt="template 1"
      />
    </div>
  );
};

export default TemplateOption;