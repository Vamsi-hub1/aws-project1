document.getElementById('userForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const age = document.getElementById('age').value;
    const travelPreference = document.getElementById('travelPreference').value;
    const travelInterest = document.getElementById('travelInterest').value;   
    const iconicPlace = document.getElementById('iconicPlace').value;
    const revisit = document.getElementById('revisit').value;

    const userDetails = {
        name: name,
        age: age,
        travelPreference: travelPreference,
        travelInterest: travelInterest,
        iconicPlace: iconicPlace,
        revisit: revisit
    };

    console.log('User Details:', userDetails);

    fetch('https://jxvnf7wcd3.execute-api.ap-south-1.amazonaws.com/test/user', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userDetails)
    })
    .then(response => {
        console.log('Response status:', response.status);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log('Success:', data);
        alert('Travel details submitted successfully!');
        document.getElementById('userForm').reset();
    })
    .catch((error) => {
        console.error('Error:', error);
        alert('Failed to submit Travel details!');
    });
});
