/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { withKnobs, select } from "@storybook/addon-knobs";

import Icon, { iconSizeValues, iconTypes } from "./Icon";
import { colorTypes } from "../../../styles";

// ===== export 정보
export default {
  title: "others/Icon",
  component: Icon,
  decorators: [withKnobs],
};

// ===== Default
export const Default = () => {
  const name = select("name", iconTypes, "home");
  const size = select("size", iconSizeValues, "s");
  const color = select("color", colorTypes, "black");
  // console.log('> ', colorTypes)

  return <Icon name={name} size={size} color={color} />;
};

/** 모든 아이콘 */
export const AllIcons = () => {
  return (
    <div css={allIconRootStyle}>
      {iconTypes.map((a, i) => (
        <div key={`all-icon-${i}`}>
          <Icon name={a} />
          <br />
          <span>{a}</span>
        </div>
      ))}
    </div>
  );
};

const allIconRootStyle = css`
  position: relative;
  display: flex;
  flex-wrap: wrap;
  & > div {
    width: 25%;
    text-align: center;
    margin-bottom: 10px;
    span {
      font-size: 0.8rem;
      color: #777777;
    }
  }
`;
