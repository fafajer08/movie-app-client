import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState(''); // New state for confirm password
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Check if password and confirm password match
        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        try {
            setLoading(true); // Set loading to true
            const res = await fetch(`https://movieapp-api-lms1.onrender.com/users/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            //response is not okay
            if (!res.ok) {
                const error = await res.json();
                throw new Error(error.message);
            }

            //response is okay
            const data = await res.json();
            console.log(`Registration Res: ${JSON.stringify(data)}`);

        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false); // Set loading back to false
        }
    };

    return (
        <div className="container">
            <h2>Register</h2>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleSubmit} className="form">
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="input"
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="input"
                />
                <input
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)} // New confirm password input
                    required
                    className="input"
                />
                <button type="submit" className="button" disabled={loading}>
                    {loading ? "Registering..." : "Register"} {/* Show loading text */}
                </button>
            </form>
            <p>
                Already have an account? <Link to="/login" className="link">Login.</Link>
            </p>
        </div>
    );
}

export default Login;
