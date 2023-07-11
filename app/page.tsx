import { CarCard, CustomFilter, Hero, SearchBar } from '@/components/Index'
import { fetchCars } from '@/utils/index';
import Image from 'next/image'

export default async function Home() {
  const Allcars = await fetchCars();

  const isDataEmpty = !Array.isArray(Allcars) || Allcars.length < 1 || !Allcars;
  
  return (
    <main className="overflow-hidden">
      <Hero />
      <div className='mt-12 padding-x padding-y max-width' id='discover'>

        <div className='home__text-container'>
          <h1 className='text-4xl font-extrabold'> Car Catelogue</h1>
          <p>Explore the cars you might like</p>
        </div>
        <div className='home__filters'>
          <SearchBar />
        <div className='home__filter-container'>
          <CustomFilter title='fuel' />
          <CustomFilter title='year' />
        </div>
        </div>

        {!isDataEmpty ? (
          <section>
             <div className='home__cars-wrapper'>
              {Allcars?.map((car) => (
                <CarCard car = {car}/>
              ))}
              </div> 
          </section>
        ):(
          <div>
            <h2>Oops! No results</h2>
            <p className='text-black text-xl font-bold'>{Allcars?.message}</p>
          </div>
        )}
      </div>

    </main>
  )
}
