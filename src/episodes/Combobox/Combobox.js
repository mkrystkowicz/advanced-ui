import React, { useState } from "react";
import { useCombobox, useMultipleSelection } from "downshift";
import styled from "styled-components";

const items = ["Fava", "Józef", "Basia", "Tola", "Lotka"];

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  padding-top: 200px;
  align-items: flex-start;
`;

const StyledCombobox = styled.div`
  width: 300px;
`;

const StyledInputWrapper = styled.div`
  position: relative;
  width: 100%;
  border: 3px solid black;
  padding: 2px;

  input {
    width: 100%;
    height: 100%;
    border: none;
    font-size: 25px;

    &:focus {
      outline: none;
    }
  }
`;

const StyledDropdownToggle = styled.button`
  position: absolute;
  right: 5px;
  top: 0;
  font-size: 25px;
  background-color: transparent;
  border: none;
`;

const StyledSelectedItem = styled.span`
  display: inline-block;
  background-color: #f9e852;
  padding: 2px 4px;
  margin: 2px;

  button {
    border: none;
    background-color: transparent;
  }
`;

const StyledOptions = styled.ul`
  width: 100%;
  border: 3px solid black;
  border-top: none;
  margin: 0;
  padding: 0;
  list-style: none;

  li {
    width: 100%;
    padding: 15px 10px;
  }
`;

const Combobox = () => {
  const [inputValue, setInputValue] = useState("");
  const {
    getSelectedItemProps,
    getDropdownProps,
    addSelectedItem,
    removeSelectedItem,
    selectedItems,
  } = useMultipleSelection();

  const getFilteredItems = () =>
    items.filter(
      (item) =>
        selectedItems.indexOf(item) < 0 &&
        item.toLowerCase().startsWith(inputValue.toLowerCase())
    );

  const {
    isOpen,
    getToggleButtonProps,
    getLabelProps,
    getMenuProps,
    getInputProps,
    getComboboxProps,
    highlightedIndex,
    getItemProps,
  } = useCombobox({
    inputValue,
    defaultHighlightedIndex: 0, // after selection, highlight the first item.
    selectedItem: null,
    items: getFilteredItems(),
    stateReducer: (_, actionAndChanges) => {
      const { changes, type } = actionAndChanges;
      switch (type) {
        case useCombobox.stateChangeTypes.InputKeyDownEnter:
        case useCombobox.stateChangeTypes.ItemClick:
          return {
            ...changes,
            isOpen: true, // keep the menu open after selection.
          };
        default:
          return changes;
      }
    },
    onStateChange: ({ inputValue, type, selectedItem }) => {
      switch (type) {
        case useCombobox.stateChangeTypes.InputChange:
          setInputValue(inputValue);
          break;
        case useCombobox.stateChangeTypes.InputKeyDownEnter:
        case useCombobox.stateChangeTypes.ItemClick:
        case useCombobox.stateChangeTypes.InputBlur:
          if (selectedItem) {
            setInputValue("");
            addSelectedItem(selectedItem);
          }
          break;
        default:
          break;
      }
    },
  });

  return (
    <Wrapper>
      <StyledCombobox>
        <label {...getLabelProps()}>Select name:</label>
        <StyledInputWrapper {...getComboboxProps()}>
          {selectedItems.map((selectedItem, index) => (
            <StyledSelectedItem
              key={`selected-item-${index}`}
              {...getSelectedItemProps({ selectedItem, index })}
            >
              {selectedItem}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  removeSelectedItem(selectedItem);
                }}
              >
                &#10005;
              </button>
            </StyledSelectedItem>
          ))}
          <input
            {...getInputProps(getDropdownProps({ preventKeyAction: isOpen }))}
          />
          <StyledDropdownToggle
            {...getToggleButtonProps()}
            aria-label={"toggle menu"}
          >
            &#9660;
          </StyledDropdownToggle>
        </StyledInputWrapper>
        <StyledOptions {...getMenuProps()}>
          {isOpen &&
            getFilteredItems(items).map((item, index) => (
              <li key={`${item}${index}`} {...getItemProps({ item, index })}>
                {item}
              </li>
            ))}
        </StyledOptions>
      </StyledCombobox>
    </Wrapper>
  );
};

export default Combobox;

