import type { NextPage } from "next";
import { Container, Grid, Center, SimpleGrid, Title, Text} from '@mantine/core';
const Footer: NextPage = () => {
  return (
      <Grid style={{
        backgroundColor: '#ffb703',
        position: "absolute",
        bottom: 0,
        width: '100%',
        padding: '25px'
        }}
      >
        <Grid.Col span={3}>
        <SimpleGrid cols={1}>
        <Title order={5}>SUPPORT</Title>
        <Text>
          Contact Us<br/>
          User Guide<br/>
          FAQ<br/>
          Help<br/>
          Examples
        </Text>
      </SimpleGrid>
        </Grid.Col>
        <Grid.Col span={3}>
        <SimpleGrid cols={1}>
        <Title order={5}>COMPANY</Title>
        <Text>
          About Us<br/>
          Media Kit<br/>
          Newsletters<br/>
          Partnerships<br/>
          Blog
        </Text>
      </SimpleGrid>
        </Grid.Col>
        <Grid.Col span={3}>
        <SimpleGrid cols={1}>
        <Title order={5}>SERVICE</Title>
        <Text>
          Compare<br/>
          Download<br/>
          Feedback<br/>
          Bug Report
        </Text>
      </SimpleGrid>
        </Grid.Col>
        <Grid.Col span={3}>
        <SimpleGrid cols={1}>
        <Title order={5}>LEGAL</Title>
        <Text>
          Terms & Condition<br/>
          Terms of Use<br/>
          Privacy Policy
        </Text>
      </SimpleGrid>
        </Grid.Col>
    </Grid>
  )
}
export default Footer;