import { Container, FormControl, Input } from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const RecipeSearch = ()=> {
    const [search, setSearch] = useState("");

    const navigate = useNavigate()

    function handleSubmit(event: { preventDefault: () => void; }) {
        event.preventDefault();
        if (search) {
            navigate(`/saved-recipes?search=${search}`);
            setSearch("");
        }
    }

    return ( 
        <Container as="form" onSubmit={handleSubmit}>
            <FormControl>
                <Input
                    size="sm"
                    width="auto"
                    type="text"
                    placeholder="Search a recipe..."
                    id="search"
                    variant="outline"
                    value={search}
                    onChange={event => setSearch(event.target.value)}
                />
            </FormControl>
        </Container>
    )
};

export default RecipeSearch;
