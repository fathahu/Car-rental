'use client'

import { useState } from "react";
import SearchManufacturer from "./SearchManufacturer";
import Image from "next/image";
import { useRouter } from "next/navigation";

const SearchButton =({otherClasses}:{otherClasses:string}) =>(
    <button type="submit" className={`-ml-3 z-10 ${otherClasses}`}>
        <Image
        src='/magnifying-glass.svg'
        alt="search button"
        width={40}
        height={40}
        className="object-contain"
        />
    </button>
)
const SearchBar = () => {
    const [manufacturer,setManufacturer]=useState('')
    const [carmodel, setCarModel] =useState('')
    const HandleSearch = (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(manufacturer === '' && carmodel === ''){
            return alert("Please fill in the Search bar")
        }
       updateSearchParams(
        carmodel.toLowerCase(),
        manufacturer.toLowerCase(),
       ) 
    }
    const router = useRouter();
    const updateSearchParams = (carmodel:string,manufacturer:string) =>{
        const SearchParams = new URLSearchParams(window.location.search);

        if(carmodel){
            SearchParams.set('carmodel',carmodel)
        }else{
            SearchParams.delete('carmodel')
        }
        if(manufacturer){
            SearchParams.set('manufacturer',manufacturer)
        }else{
            SearchParams.delete('manufacturer')
        }
        const newPathname = `${window.location.pathname}?${SearchParams.toString()}`
        router.push(newPathname);
    }
    return (
        <form className='searchbar' onSubmit={HandleSearch}>
            <div className="searchbar__item">
                <SearchManufacturer
                manufacturer = {manufacturer}
                setManufacturer = {setManufacturer}
                />
               <SearchButton otherClasses="sm:hidden"/> 
            </div>
            <div className="searchbar__item">
            <Image 
            src='/model-icon.png'
            width={25}
            height={25}
            className="absolute ml-4"
            alt="model "
            />
            <input 
            type="text" 
            name="carmodel"
             value={carmodel}
             onChange={(e) => setCarModel(e.target.value)}
             placeholder="Car Model"
             className="searchbar__input"
             />
               <SearchButton otherClasses="sm:hidden"/> 
            </div>
            <SearchButton otherClasses="max-sm:hidden"/> 

        </form>
    )
}

export default SearchBar