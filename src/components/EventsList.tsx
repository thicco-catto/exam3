interface EventListProps {
    events: any[]
}

export function EventList(props: EventListProps) {
    if(props.events.length === 0) {
        return <h2>No se han encontrado eventos.</h2>
    }

    return props.events.map(event => {
        return <EventListElement key={event.nombre} event={event}></EventListElement>
    })
}


interface EventListElementProps {
    event: any
}

export function EventListElement(props: EventListElementProps) {
    return <>
        <a href={`/event/${props.event._id}`}><h2>{props.event.name}</h2></a>
        <br></br>
        <p>Organizado por: {props.event.organizer}</p>
    </>;
}