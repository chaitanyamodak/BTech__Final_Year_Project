import React from "react";
import { LANGUAGE_VERSIONS } from "../constants/Languages.js";
import { customStyles } from "../constants/customStyles.js";
import Select from "react-select";

const languages = Object.entries(LANGUAGE_VERSIONS);

const LanguageSelector = ({ defLanguage, onSelectChange }) => {
  return (
    <div className="p-3 absolute top-0 z-50 right-20">
      <Select
        placeholder={defLanguage || "Select Language"}
        options={languages.map(([language, version]) => ({
          value: language,
          label: `${language} (${version})`,
        }))}
        styles={customStyles}
        defaultValue={defLanguage}
        onChange={(selectedOption) => onSelectChange(selectedOption)}
      />
    </div>
  );
};

export default LanguageSelector;
