const departments = require('./departments');
const quotas = require('./quotas');
const users = require('./users');

const actions = {
    'find-quota-less-departments': () => {
        return departments.filter((department) => {
            return !quotas.some((quota) => quota.departmentId === department.id);
        });
    },
    'map-users-to-departments': () => {
        users.forEach((user) => {
            if (!user.departmentId) {
                user.departmentId = 1;
            }
        });
        return users;
    },
    'create-quota': () => {
        const quotalessDepartments = actions['find-quota-less-departments']();
        quotalessDepartments.forEach((department) => {
            quotas.push({
                name: 'Quota - ' + department.name,
                departmentId: department.id
            });
        });
        return quotas;
    }
};

const rules = {
    'every-user-has-department': {
        name: 'Every user is mapped to a department',
        condition: () => {
            return !users.some((user) => !user.departmentId);
        },
        action: actions['map-users-to-departments']
    },
    'department-has-quota': {
        name: 'Every department has a quota',
        condition: () => {
            return actions['find-quota-less-departments']().length === 0;
        },
        action: actions['create-quota']
    }
};

module.exports = {
    rules
};