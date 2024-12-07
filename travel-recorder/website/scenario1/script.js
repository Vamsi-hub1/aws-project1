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

    // Here, you will make an API call to save the user details
    // For now, we'll just log the details to the console

    alert('Travel details submitted successfully!');
    document.getElementById('userForm').reset();
});
