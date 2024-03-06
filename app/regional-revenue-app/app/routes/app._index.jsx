import { useEffect } from "react";
import { json } from "@remix-run/node";
import {Badge} from '@shopify/polaris';
import {DescriptionList} from '@shopify/polaris';
import {
  Link,
  useActionData,
  useLoaderData,
  useNavigation,
  useSubmit,
} from "@remix-run/react";
import {
  Page,
  Layout,
  Text,
  VerticalStack,
  Card,
  Button,
  HorizontalStack,
  Box,
  Divider,
  List,
} from "@shopify/polaris";

import { authenticate } from "../shopify.server";

export const loader = async ({ request }) => {
  const { session } = await authenticate.admin(request);

  return json({ shop: session.shop.replace(".myshopify.com", "") });
};

export async function action({ request }) {
  const { admin } = await authenticate.admin(request);

}

export default function Index() {
  const nav = useNavigation();
  const { shop } = useLoaderData();
  const actionData = useActionData();
  const submit = useSubmit();

  return (
    <Page>
      <ui-title-bar title="Payment Method Hider">
      </ui-title-bar>
      <VerticalStack gap="5">
        <Layout>
          <Layout.Section>
            <Card>
              <VerticalStack gap="5">
                <VerticalStack gap="2">
                  <Text as="h2" variant="headingMd">
                    Payment Method Hider
                  </Text>
                  <Text variant="bodyMd" as="p">
                    This application is able to conditionally hide a payment method, based on a specific product ID.
                  </Text>
                </VerticalStack>
                <VerticalStack gap="2">
                  <Text as="h3" variant="headingMd">
                    Get started
                  </Text>
                  <Text as="p" variant="bodyMd">
                    To get started, navigate to the payment settings, and add a new payment customisation.
                  </Text>
                </VerticalStack>
                <HorizontalStack gap="3" align="end">
                    <Button
                      url={`https://admin.shopify.com/store/${shop}/settings/payments`}
                      target="_blank"
                    >
                      View Payment Settings
                    </Button>
                </HorizontalStack>
                <VerticalStack gap="2">
                  <Text as="p" variant="bodyMd">
                    Scroll to <Badge >Payment Method Customisations</Badge> and select <Badge>manage</Badge>. 
                  </Text>
                  <Text as="p" variant="bodyMd">
                    Select <Badge >Add a Customization</Badge>
                  </Text>
                  <Text as="p" variant="bodyMd">
                    Select <Badge >Add a Customization</Badge>
                  </Text>
                  <Text as="p" variant="bodyMd">
                    Select <Badge >payment-customization-js</Badge>
                  </Text>
                  <Text as="p" variant="bodyMd">
                    Input the payment method to hide, and the productID.
                  </Text>
                  <Text as="p" variant="bodyMd">
                    You should now see the removal of the payment method when the product is in the cart.
                  </Text>
                </VerticalStack>
              </VerticalStack>
            </Card>
          </Layout.Section>
        </Layout>
      </VerticalStack>
    </Page>
  );
}
