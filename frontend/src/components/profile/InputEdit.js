import React from 'react';

const InputEdit = (props) => {
    const {setState, i, input, user, setUser} = props;
    return (
        <div>
            {/* Get these attr from props */}
            <input name={input[i].name} placeholder={input[i].name} onChange={e => {
                let copyUser = {...user};
                copyUser[input[i].name] = e.target.value;
                setUser(copyUser)
            }} 
                disabled={input[i].disabled} value={user[i]}/>
            <button onClick = {() => {
                let copyState = [...input];
                copyState[i].disabled = !input[i].disabled
                setState(copyState)}}>{input[i].disabled ? 'Enable' : 'Disable'}</button>
        </div>
    );
};

export default InputEdit;