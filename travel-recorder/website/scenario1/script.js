document.getElementById('userForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const hobby = document.getElementById('hobby').value;
    const travelInterest = document.getElementById('travelInterest').value;
    const iconicPlace = document.getElementById('iconicPlace').value;

    const userDetails = {
        name: name,
        hobby: hobby,
        travelInterest: travelInterest,
        iconicPlace: iconicPlace
    };

    console.log('User Details:', userDetails);

    // Here, you will make an API call to save the user details
    // For now, we'll just log the details to the console

    alert('User details submitted successfully!');
    document.getElementById('userForm').reset();
});
