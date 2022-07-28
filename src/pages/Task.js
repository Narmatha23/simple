
import { useState } from 'react';
import allVotes from '../Data/votes';
import './Task.css';


function getTotalScore(votes) {
    const scoreMap = votes.reduce((acc, val) => {
        const opt = acc[val.option];
        if (typeof opt === "number") {
            acc[val.option] += val.points;
        } else {
            acc[val.option] = val.points;
        }
        return acc;
    }, {});

    return scoreMap;
}




const Task = () =>{
    const [votes, setVotes] = useState(allVotes);

    const [form, setForm] = useState(initalState);

    const votesHash = getTotalScore(votes);
    const handleSubmit = (e) => {
        e.preventDefault();
        const timestamp = new Date().getTime();
        let {
            voter,
            option,
            points
        } = form;
        points = points * 1;

        setVotes((prev) => [...prev, {
            timestamp,
            voter,
            option,
            points
        }]);
        setForm(initalState);
    };

    const handleChange = (e) => {
        const {
            name,
            value
        } = e.target;
        setForm((prev) => ({ ...prev,
            [name]: value
        }));
    };

    
    return(
      <div className="container">
        <section className="main">
            <form onSubmit={handleSubmit}>
                <h2 className="heading"> Voting Booth</h2>
                <div className="form-items">
                    <label htmlFor='voter'>Your Name</label>
                    <input id='voter'
                    name='voter'
                     type='text'
                     required={true}
                     vale = {form.voter}
                     onChange={handleChange}
                    />
                </div>
                <div className="form-items">
                <label htmlFor='points'>Points(1-100)</label>
                    <input id='points'
                    name='points'
                    type='number'
                    min={1}
                    max={100}
                    required={true} 
                    value = {
                        form.points
                    }
                    onChange = {
                        handleChange
                    }/>
                </div>
                <div className="form-items">
                <label htmlFor='select'>Options</label>
                    <select id='options'
                    placeholder='Select Your Options'
                    value = {
                        form.option
                    }
                    onChange = {
                        handleChange
                    }
                    >
                    
                        {
                            options.map((i) => (
                               <option name = "option"
                               key={i}
                               value={i}>
                                {i}
                               </option>
                            ))
                        }
                   </select>
                </div>
                   
                
                <button type='submit'>Give Points!</button>
            </form>
            <div className='leader-board'>
                <h2 className='board-name'>LeaderBoard</h2>
                <ol className='leader-list'>
                    {
                        Object.entries(votesHash).sort((a,b) =>{
                            return b[1] - a[1];
                        }).map(([optionName,points],index) => (
                            <li className='leader-data' key = {index}>
                                <div>
                                    {""}
                                    <span>
                                       #{
                                        index + 1
                                       }
                                    </span>
                                    {optionName}
                                </div>
                                <div>{points}</div>
                            </li>
                        )
                          
                        )
                    }
                </ol>
            </div>
        </section>
        <div className='all-votes'>
            <h2>All Votes</h2>
            <table className='data'>
                <thead>
                    <th>Date</th>
                    <th>Voter</th>
                    <th>Options</th>
                    <th>Points</th>
                </thead>
                <tbody>
                    {votes.map(({
                        timestamp,
                        voter,
                        points,
                        option
                    }) => (
                        <tr>
                            <td>{new Date(timestamp).toLocaleString()}</td>
                            <td>{voter|| "anonymous"}</td>
                            <td>{option}</td>
                            <td>{points}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
      </div>
    )
}

export default Task;


    // options
    const allOptions = [
        "The Office",
        "Trailer Park Boys",
        "Shrek",
        "Rick And Morty",
        "Brooklyn 99",
        "Parks and Recreation",
        "F.R.I.E.N.D.S",
        "Bojack Horseman",
    ];
    
    const options = allOptions;

const initalState = {
    voter: "",
    points: "",
    option: options[0],
};