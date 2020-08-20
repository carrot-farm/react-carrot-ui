/** @jsx jsx */
import { jsx } from "@emotion/core";
import { withKnobs, boolean } from "@storybook/addon-knobs";

import Table from "./Table";

// ===== export 정보
export default {
  title: "display/Table",
  component: Table,
  decorators: [withKnobs],
};

// ===== Default
export const Default = () => {
  const responsive = boolean("responsive", false);

  return (
    <Table responsive={responsive}>
      <thead>
        <tr>
          <th>head1</th>
          <th>head2</th>
          <th>head3</th>
          <th>head4</th>
          <th>head5</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>tbody</td>
          <td>tbody</td>
          <td>tbody</td>
          <td>tbody</td>
          <td>tbody</td>
        </tr>
        <tr>
          <td>tbody</td>
          <td>tbody</td>
          <td>tbody</td>
          <td>tbody</td>
          <td>tbody</td>
        </tr>
        <tr>
          <td>tbody</td>
          <td>tbody</td>
          <td>tbody</td>
          <td>tbody</td>
          <td>tbody</td>
        </tr>
        <tr>
          <td>tbody</td>
          <td>tbody</td>
          <td>tbody</td>
          <td>tbody</td>
          <td>tbody</td>
        </tr>
        <tr>
          <td>tbody</td>
          <td>tbody</td>
          <td>tbody</td>
          <td>tbody</td>
          <td>tbody</td>
        </tr>
      </tbody>
    </Table>
  );
};
