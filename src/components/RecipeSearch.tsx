import { Container, FormControl, Input } from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate,useSearchParams } from "react-router-dom";

const RecipeSearch = ()=> {

    const [search, setSearch] = useState("")

    const navigate = useNavigate()

    let [searchParams, setSearchParams] = useSearchParams();

    function handleSubmit(event: { preventDefault: () => void; }) {
        event.preventDefault();
        setSearchParams({search:`${search}`});
        console.log(searchParams)
        navigate(`/saved-recipes?search=${searchParams}`)
        
        /* THE PART WITH SENDING STATE TO SAVEDRECIPES
        console.log("I am running in submit")
        navigate("/saved-recipes", {state: {
            search:search
        }})*/
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
