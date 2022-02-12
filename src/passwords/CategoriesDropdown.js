import React, { useState } from 'react';
import {Dropdown, Form, InputGroup} from "react-bootstrap";
import {addCategory, deleteCategory} from "../state/slices/dropFile/dropFileDispatchers";
import {saveDropfile} from "../state/slices/dropFile/dropFileUtils";
import { useSelector } from "react-redux";

export default function CategoriesDropdown({fileHandle, setFileHandle}) {
    const [newCategory, setNewCategory] = useState('');
    const [addCategoryActive, setAddCategoryActive] = useState(false);
    const state = useSelector(state => state);
    //const settings = state.dropFile.data.settings;
    //const passwords = state.dropFile.data.passwords;

    const handleCategoryAdd = async() => {
        if(newCategory !== '') {
            addCategory(newCategory);
            setNewCategory('');
            await saveDropfile(fileHandle);
        }
    }

    const handleCategoryDelete = async(category) => {
        deleteCategory(category);
        await saveDropfile(fileHandle);
    }

    return (
        <Dropdown autoClose="outside">
            <Dropdown.Toggle
                size="sm"
                id="dropdown-button-dark-example1"
                className="w-100"
                variant="outline-light"
            >
                Categories
            </Dropdown.Toggle>
            <Dropdown.Menu variant="light" className="w-100">
                <Dropdown.Item onClick={() => setAddCategoryActive(!addCategoryActive)}>Add Category</Dropdown.Item>
                { addCategoryActive &&
                    <Dropdown.Item>
                        <InputGroup size="sm" className="mb-3">
                            <Form.Control
                                size="sm"
                                type="text"
                                placeholder="Add category..."
                                value={ newCategory }
                                onChange={e => setNewCategory(e.target.value)}
                            />
                            <InputGroup.Text
                                onClick={() => handleCategoryAdd()}
                            >
                                add
                            </InputGroup.Text>
                        </InputGroup>
                    </Dropdown.Item>
                }
                <Dropdown.Divider />
                {
                    state.dropFile.data.settings.passwordCategories
                        .map((category, index) => <Dropdown.Item key={index} href="#/action-4">{category} <span onClick={() => handleCategoryDelete(category)} style={{float: 'right'}}>X</span></Dropdown.Item>)
                }
            </Dropdown.Menu>
        </Dropdown>
    );
}
