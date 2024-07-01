document.addEventListener('DOMContentLoaded', () => {
    const homeLink = document.getElementById('homeLink');
    const booksLink = document.getElementById('booksLink');
    const loginLink = document.getElementById('loginLink');
    const registerLink = document.getElementById('registerLink');

    const homeSection = document.getElementById('homeSection');
    const booksSection = document.getElementById('booksSection');
    const loginSection = document.getElementById('loginSection');
    const registerSection = document.getElementById('registerSection');

    const sections = [homeSection, booksSection, loginSection, registerSection];

    function showSection(section) {
        sections.forEach(sec => sec.style.display = 'none');
        section.style.display = 'block';
    }

    homeLink.addEventListener('click', () => showSection(homeSection));
    booksLink.addEventListener('click', () => showSection(booksSection));
    loginLink.addEventListener('click', () => showSection(loginSection));
    registerLink.addEventListener('click', () => showSection(registerSection));

    // Fetch books data
    async function fetchBooks() {
        try {
            const res = await fetch('http://localhost:5000/api/books');
            const books = await res.json();
            const booksList = document.getElementById('booksList');
            booksList.innerHTML = '';
            books.forEach(book => {
                const li = document.createElement('li');
                li.classList.add('list-group-item');
                li.textContent = book.title;
                booksList.appendChild(li);
            });
        } catch (err) {
            console.error('Error fetching books:', err);
        }
    }

    booksLink.addEventListener('click', fetchBooks);

    // Handle login
    document.getElementById('loginForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;
        try {
            const res = await fetch('http://localhost:5000/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });
            const data = await res.json();
            if (data.token) {
                alert('Login successful!');
                // Store the token in localStorage or cookies
            } else {
                alert('Login failed');
            }
        } catch (err) {
            console.error('Error logging in:', err);
        }
    });

    // Handle registration
    document.getElementById('registerForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('registerEmail').value;
        const password = document.getElementById('registerPassword').value;
        try {
            const res = await fetch('http://localhost:5000/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });
            const data = await res.json();
            if (data.id) {
                alert('Registration successful!');
                showSection(loginSection);
            } else {
                alert('Registration failed');
            }
        } catch (err) {
            console.error('Error registering:', err);
        }
    });
});
