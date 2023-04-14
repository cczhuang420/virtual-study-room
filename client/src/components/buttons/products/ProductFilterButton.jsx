import React, from "react";
import { styled } from "@mui/system";
import { buttonUnstyledClasses } from "@mui/base/ButtonUnstyled";
import TabsUnstyled from "@mui/base/TabsUnstyled";
import TabUnstyled, { tabUnstyledClasses } from "@mui/base/TabUnstyled";
import TabsListUnstyled from "@mui/base/TabsListUnstyled";
import { TabPanelUnstyled } from "@mui/base";
import ProductContainer from "../../productCards/ProductContainer.jsx";

const ProductFilterButton = () => {
  const Tab = styled(TabUnstyled)`
    font-family: "Rubik", "Nexa", "sans-serif";
    color: black;
    cursor: pointer;
    font-size: 0.875rem;
    font-weight: bold;
    background-color: #9b84b4;
    width: 120px;
    padding: 8px 15px;
    margin: 5px 6px 0 6px;
    border: none;
    border-radius: 50px;
    display: flex;
    justify-content: center;

    &:hover {
      background-color: #ccbce3;
    }

    &.${tabUnstyledClasses.selected} {
      background-color: #fff;
      color: black;
    }

    &.${buttonUnstyledClasses.disabled} {
      opacity: 0.5;
      cursor: not-allowed;
    }
  `;

  const TabsList = styled(TabsListUnstyled)(
    ({ theme }) => `
  min-width: 400px;
  margin-bottom: 2px;
  margin-left:32px;
  margin-top:30px;
  display: flex;
  background-color:transparent;
  `
  );

  const TabPanel = styled(TabPanelUnstyled)`
    width: 100%;
    font-family: "Rubik", "Nexa", "sans-serif";
    font-size: 0.875rem;
  `;

  return (
    <div>
      <TabsUnstyled defaultValue={0} selectionFollowsFocus>
        <TabsList>
          <Tab>Background</Tab>
          <Tab>Profile Photo</Tab>
          <Tab>Music</Tab>
        </TabsList>
        <TabPanel value={0}>
          <ProductContainer value={0} />
        </TabPanel>
        <TabPanel value={1}>
          <ProductContainer value={1} />
        </TabPanel>
        <TabPanel value={2}>
          <ProductContainer value={2} />
        </TabPanel>
      </TabsUnstyled>
    </div>
  );
};

export default ProductFilterButton;
