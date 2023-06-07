export default function Gamelist(props) {
    const gamelist = props.name;
    console.log('1'+props)
    const gamelink = () => {
        window.open(props.link);
    }
    return(
        <>
        <div class="col mb-5 hover:cursor-pointer">
            <div class="card h-100 w-[300px] h-[200px]" id={props.id} onClick={gamelink}>
                <img class="card-img-top" src={props.img} alt="..." />
                <div class="card-body p-4">
                    <div class="text-center">
                        <h5 class="fw-bolder">{gamelist}</h5>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}