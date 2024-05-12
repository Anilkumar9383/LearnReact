import React from 'react'
import {useNavigate} from 'react-router-dom'

function Logindetails() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()
    const token = localStorage.getItem('JwtToken');

    const fetchData = async () => {
        try {
            setLoading(true);
            setData([]);
            if (token != null) {
                const response = await fetch(apiURL + "GetLogin/GetLogins", {
                    method: "Post",
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const jsonData = await response.json();
                setData(jsonData);
            }
            else {
                navigate('/login')
            }

        } catch (error) {
            navigate('/login')
            setData([]);
        } finally {
            setLoading(false);
        }
    }
    return (
        <div>
            {loading && <p>Loading...</p>}
            <button type="button" className="m-2" onClick={fetchData}>Show Logins</button>
            <table>
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Password</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((Obj, i) => (
                        <tr key={i}>
                            <td>{Obj.Username}</td>
                            <td>{Obj.Password}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </div>
    )
}

export default Logindetails
