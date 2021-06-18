function reducer(state = { messages : []}, action){
    switch(action.type)
    {
        case 'ADD_MSG':
          
            let currentMessages = state.messages;
            currentMessages.push(action.payload);

            return {...state, messages : currentMessages}

        default:
            return state;
    }
}

export default reducer;