document.getElementById('travelForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const age = document.getElementById('age').value;
    const gender = document.getElementById('gender').value;

    const travelPreference = Array.from(document.getElementById('travelPreference').selectedOptions).map(option => option.value);
    const travelInterest = Array.from(document.getElementById('travelInterest').selectedOptions).map(option => option.value);

    const iconicPlace = document.getElementById('iconicPlace').value;
    const placeToVisitAgain = document.getElementById('placeToVisitAgain').value;

    const userDetails = {
        name: name,
        age: age,
        gender: gender,
        travelPreference: travelPreference,
        travelInterest: travelInterest,
        iconicPlace: iconicPlace,
        placeToVisitAgain: placeToVisitAgain
    };

    console.log('Submitting user details:', userDetails);

    fetch('https://<your-api-id>.execute-api.<your-region>.amazonaws.com/prod/user', {
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
        alert('User details submitted successfully!');
        document.getElementById('travelForm').reset();
    })
    .catch((error) => {
        console.error('Error:', error);
        alert('Failed to submit user details!');
    });
});
