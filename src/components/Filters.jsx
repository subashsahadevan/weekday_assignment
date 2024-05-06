import { Grid, InputLabel, MenuItem, Stack, TextField } from '@mui/material'
import RoleFilter from './RoleFilter'
import Select from 'react-select';
import { useState,useEffect } from 'react';
const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
];
const options_role = [
    { value: 'frontend', label: 'Frontend' },
    { value: 'backend', label: 'Backend' },
    { value: 'android', label: 'Android' },
    { value: 'ios', label: 'IOS' },
    { value: 'tech lead', label: 'Tech Lead' },
];
const emp_options = [
    { value: '10', label: '1-10' },
    { value: '20', label: '11-20' },
    { value: '50', label: '21-50' },
    { value: '100', label: '51-100' },
    { value: '200', label: '101-200' },
    { value: '500', label: '201-500' },
    { value: '501', label: '500+' }
];
const exp_options = [
    { value: '1', label: '1' },
    { value: '2', label: '2' },
    { value: '3', label: '3' },
    { value: '4', label: '4' },
    { value: '5', label: '5' },
    { value: '6', label: '6' },
    { value: '7', label: '7' },
    { value: '8', label: '8' },
    { value: '9', label: '9' },
    { value: '10', label: '10' },
];
const remote_options = [
    { value: 'remote', label: 'Remote' },
    { value: 'in-office', label: 'In-Office' },

];
const salary_options = [
    { value: 0, label: '0L' },
    { value: 10, label: '10L' },
    { value: 20, label: '20L' },
    { value: 30, label: '30L' },
    { value: 40, label: '40L' },
    { value: 50, label: '50L' },
    { value: 60, label: '60L' },
    { value: 70, label: '70L' },
];
const tech_options = [
    { value: 'python', label: 'Python' },
    { value: 'java', label: 'Java' },
    { value: 'golang', label: 'GoLang' },
    { value: 'ruby', label: 'Ruby/Rails' },
    { value: 'c++', label: 'C++' },
    { value: 'kotlin', label: 'Kotlin' },
    { value: 'django', label: 'Django' },
    { value: 'c#', label: 'C#' },
    { value: 'graphql', label: 'GraphQL' },
    { value: 'flask', label: 'Flask' },
    { value: 'typescript', label: 'Typescript' },
    { value: 'aws', label: 'AWS' },
    { value: 'javascript', label: 'Javascript' },
    { value: 'rust', label: 'Rust' },
    { value: 'node', label: 'NodeJS' },
    { value: 'react', label: 'React' },
]

function Filters({onFilterChange}) {
    const [selectedOption, setSelectedOption] = useState(null);
    const [selectedRole, setSelectedRole] = useState([]);
    const [selectedEmp, setSelectedEmp] = useState([]);
    const [selectedExp, setSelectedExp] = useState([]);
    const [selectedRemote, setSelectedRemote] = useState([]);
    const [selectedTech, setSelectedTech] = useState([]);
    const [selectedSalary, setSelectedSalary] = useState([]);
    const [search, setSearch] = useState('');
    const mr = {
        marginRight: '5px'
    };
    const input_size = {
        fontSize: '15px !important'
    };
    useEffect(() => {
        // This effect will run whenever any of the filter values change
        handleFilterChange();
    }, [selectedRole, selectedEmp, selectedExp, selectedRemote, selectedTech, selectedSalary, search]);
    const handleFilterChange = () => {

        const selectedRoleValues = selectedRole.map(option => option.value);
        const selectedEmpValues = selectedEmp.map(option => option.value);
        const selectedExpValues = selectedExp.map(option => option.value);
        const selectedRemoteValues = selectedRemote.map(option => option.value);
        const selectedTechValues = selectedTech.map(option => option.value);
        const selectedSalaryValues = selectedSalary.value;
        console.log(selectedRole)
        const filters = {
            role: selectedRoleValues,
            emp: selectedEmpValues,
            exp: selectedExpValues,
            remote: selectedRemoteValues,
            tech: selectedTechValues,
            salary: selectedSalaryValues,
            search:search
            // Other filters...
        };
        onFilterChange(filters);
    };
    return (
        <Stack direction="row"
            alignItems="center" mb={5} mt={5} className='filters'>
            <div style={mr} >  
                <Select
                    defaultValue={selectedRole}
                    isMulti
                    options={options_role}
                    placeholder="Role"
                    className='input'
                    width={200}
                    onChange={setSelectedRole}
                />
            </div>
            {/* <div style={mr}>
                <Select
                    defaultValue={selectedEmp}
                    isMulti
                    options={emp_options}
                    placeholder="Numbers Of Employees"
                    className='input'
                    onChange={setSelectedEmp}
                />
            </div> */}
            <div style={mr}>
                <Select
                    defaultValue={selectedExp}
                    isMulti
                    options={exp_options}
                    placeholder="Experiance"
                    className='input'
                    onChange={setSelectedExp}
                />
            </div>
            <div style={mr}>
                <Select
                    defaultValue={selectedRemote}
                    isMulti
                    options={remote_options}
                    placeholder="Remote"
                    className='input'
                    onChange={setSelectedRemote}
                />
            </div>
            {/* <div style={mr}>
                <Select
                    defaultValue={selectedTech}
                    isMulti
                    options={tech_options}
                    placeholder="Tech Stack"
                    className='input'
                    onChange={setSelectedTech}
                />
            </div> */}
            <div style={mr}>
                <Select
                    defaultValue={selectedSalary}
                    options={salary_options}
                    placeholder="Minimum Base Pay Salary"
                    className='input'
                    onChange={setSelectedSalary}
                />
            </div>
            <div style={mr}>
                <TextField hiddenLabel size="small" placeholder='Search Company Name' className='input' style={input_size} onChange={(e) => setSearch(e.target.value)} />
            </div>

        </Stack>
    )
}

export default Filters