const UserRole = Object.freeze({
    ADMIN: 1,
    CLIENTE: 2
});

function isValidRole(value) {
    return Object.values(UserRole).includes(value);
}

function isAdmin(role) {
    return role === UserRole.ADMIN;
}

function isClienterole(role) {
    return role === UserRole.CLIENTE;
}

function getRoleName(value) {
    return Object.keys(UserRole).find(key => UserRole[key] === value) || null;
}

module.exports = { UserRole, isValidRole, isAdmin, isClienterole, getRoleName };