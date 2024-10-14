import React from 'react'

type Props = {
    title: string;
}

export const Typography = ({ title }: Props) => {
    return (
        <div>{title}</div>
    )
}
