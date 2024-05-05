import * as React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import BoltIcon from '@mui/icons-material/Bolt';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { Stack } from '@mui/material';
export default function JobCard(props) {
    const [expanded, setExpanded] = useState(false);
    const { job } = props

    //inline-styles
    const border_radius = {
        borderRadius: '20px',
        marginBottom: '40px'
    }
    const custom_btn = {
        width: '100%',
        backgroundColor: ' rgb(85, 239, 196)',
        color: ' rgb(0, 0, 0)',
        fontWeight: '400',
        padding: '8px 20px',
        textTransform: 'Capitalize',
        borderRadius: '8px',
        margin: '5px 0',
        fontSize:'16px'
    }
    const custom_btn_unlock = {
        width: '100%',
        backgroundColor: ' rgb(73, 67, 218)',
        color: ' rgb(256, 256, 256)',
        fontWeight: '400',
        padding: '8px 20px',
        textTransform: 'Capitalize',
        borderRadius: '8px',
        margin: '5px 0',
        fontSize:'16px'
    }
    const color_icon = {
        color: '#ff822d'
    }
    const icon_color_green = {
        color: '#00d26a',
        width:'16px'
    }
    const mr = {
        marginRight: '.5rem',
        marginTop: '-20px'
    }
    const minimum_exp = {
        fontSize: '13px',
        fontWeight: '600',
        letterSpacing: '1px',
        marginBottom: '3px',
        color: '#8b8b8b'
    }

    //toggle expand function
    const toggleExpand = () => {
        setExpanded(!expanded)
    }

return (
    <Box sx={{ minWidth: 275, maxWidth: 340 }}>
        <Card style={border_radius}>
            <CardContent>
                <Stack direction="row"
                    alignItems="center" style={{ marginTop: '1rem' }}>
                    <img src={job.logoUrl} alt="" width={30} style={mr} />
                    <div>
                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom style={{ fontSize: 13, lineHeight: '2px' }}>
                            {job.companyName}
                        </Typography>
                        <Typography variant="h5" component="div" style={{ fontSize: 14 }}>
                            {job.jobRole}
                        </Typography>
                        <Typography color="text.secondary" style={{ fontSize: 11 }}>
                            {job.location}
                        </Typography>
                    </div>
                </Stack>

                <Typography variant="body2">
                    <Stack direction="row"
                        alignItems="center" style={{ marginBottom: '1rem', fontWeight: '300' }}>
                        Estimated Salary: ${job.minJdSalary}-${job.maxJdSalary}<CheckBoxIcon style={icon_color_green} />
                    </Stack>
                </Typography>
                <Typography variant="body2" className={expanded ? '' : 'hiddenContent'} >
                    <span>{expanded ? job.jobDetailsFromCompany : job.jobDetailsFromCompany.slice(0, 500)}</span>
                    {!expanded && (
                        <Button onClick={toggleExpand} fullWidth>
                            View More
                        </Button>
                    )}
                </Typography>
                <Typography variant="body1" style={minimum_exp}>
                    Minimum Experianced Required
                </Typography>
                <Typography variant="body1" style={{fontSize:'14px',marginBottom:'1rem'}}>

                    {job.minExp} Years
                </Typography>
                <Button size="small" fullWidth variant="contained" style={custom_btn}><BoltIcon style={color_icon} />Easy Apply</Button>
                <Button size="small" fullWidth variant="contained" style={custom_btn_unlock}>Unlock refferal asks</Button>
            </CardContent>
        </Card>
    </Box>
);
}
