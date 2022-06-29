import type { NextPage } from "next";
import { Container, Grid, Center, SimpleGrid, Title, Text} from '@mantine/core';
const Footer: NextPage = () => {
  return (
      <Grid style={{
        backgroundColor: '#ffb703',
        position: "absolute",
        bottom: 0,
        width: '100%',
        padding: '50px' }}
      >
        <Grid.Col span={3}>
        <SimpleGrid cols={1}>
        <Title order={3}>SUPPORT</Title>
        <Text>Contact Us</Text>
        <Text>User Guide</Text>
        <Text>FAQ</Text>
        <Text>Help</Text>
        <Text>Examples</Text>
      </SimpleGrid>
        </Grid.Col>
        <Grid.Col span={3}>
        <SimpleGrid cols={1}>
        <Title order={3}>COMPANY</Title>
        <Text>About Us</Text>
        <Text>Media Kit</Text>
        <Text>Newsletters</Text>
        <Text>Partnerships</Text>
        <Text>Blog</Text>
      </SimpleGrid>
        </Grid.Col>
        <Grid.Col span={3}>
        <SimpleGrid cols={1}>
        <Title order={3}>SERVICE</Title>
        <Text>Compare</Text>
        <Text>Download</Text>
        <Text>Feedback</Text>
        <Text>Bug Report</Text>
      </SimpleGrid>
        </Grid.Col>
        <Grid.Col span={3}>
        <SimpleGrid cols={1}>
        <Title order={3}>LEGAL</Title>
        <Text>Terms & Condition</Text>
        <Text>Terms of Use</Text>
        <Text>Privacy Policy</Text>
      </SimpleGrid>
        </Grid.Col>
    </Grid>
  )
}
export default Footer;