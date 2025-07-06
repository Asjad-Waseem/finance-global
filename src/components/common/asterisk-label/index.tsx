const LabelWithAsterisk = ({ text }: { text: string }) => (
  <span>
    {text}
    <span className="ml-1 text-red-500">*</span>
  </span>
);

export default LabelWithAsterisk;
