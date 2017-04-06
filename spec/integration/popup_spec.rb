require_relative 'spec_helpers/test_helper'

describe 'Popup' do
  include_context 'with_browser'

  it 'should display Hello World' do
    expect(browser.text).to include('Hello, World!')
  end
end
