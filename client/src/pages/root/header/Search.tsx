import React, {useEffect, useState} from 'react';
import {useNavigate, useSearchParams} from "react-router-dom";
import {Input} from "antd";


const Search: React.FC = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [value, setValue] = useState(searchParams.get("search") || "")

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            if (value === "") {
                searchParams.delete("search");
            } else {
                searchParams.set("search", value)
            }
            navigate(`?${searchParams.toString()}`)
        }, 500)
        return () => clearTimeout(delayDebounceFn)
    }, [value, searchParams.get("search")])
    return (
        <Input.Search
            value={value} placeholder="Tìm kiếm"
            allowClear={true}
            onChange={({target}) => setValue(target.value)}
        />);
};

export default Search;
