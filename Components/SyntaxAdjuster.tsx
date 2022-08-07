import React from 'react'

import { JabProps, StirilProps, StrayProps } from '../types/Types'

function strayDef (props: StrayProps)  {
    if(props.stray === 'Домашний' && props.gender === 'Девочка') {
        return 'Домашняя'
    } else if (props.stray === 'Домашний' && props.gender === 'Мальчик') {
        return 'Домашний'
    } else if (props.stray === 'Уличный' && props.gender === 'Мальчик') {
        return 'Уличный'
    } else if (props.stray === 'Уличный' && props.gender === 'Девочка') {
        return 'Уличная'
    } 
}

function stirilDef (props: StirilProps) {
    if(props.stiril === 'Стерильный' && props.gender === 'Девочка') {
        return 'Стерильная'
    } else if (props.stiril === 'Стерильный' && props.gender === 'Мальчик') {
        return 'Стерильный'
    } else if (props.stiril === 'Не стерильный' && props.gender === 'Мальчик') {
        return 'Не стерильный'
    } else if (props.stiril === 'Не стерильный' && props.gender === 'Девочка') {
        return 'Не стерильная'
    } 
}

function jabDef (props: JabProps) {
    if(props.jab === 'Привит' && props.gender === 'Девочка') {
        return 'Привита'
    } else if (props.jab === 'Привит' && props.gender === 'Мальчик') {
        return 'Привит'
    } else if (props.jab === 'Не привит' && props.gender === 'Мальчик') {
        return 'Не Привит'
    } else if (props.jab === 'Не привит' && props.gender === 'Девочка') {
        return 'Не Привита'
    } 
}

export {
    strayDef,
    stirilDef,
    jabDef
}