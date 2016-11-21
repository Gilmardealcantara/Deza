from flask import url_for
from test_base import BaseTestCase


class GeneralModuleTests(BaseTestCase):

    def test_should_redirect_when_access_root(self):
        response = self.client.get('/')
        self.assert_200(response)
