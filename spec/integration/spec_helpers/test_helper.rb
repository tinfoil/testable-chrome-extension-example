require 'watir-webdriver'
require 'json'
require 'net/http'
require_relative 'managers/browser'

EXTENSION_ID = 'okmpomachkapopnbfhnkdaaahhlnflpg'
EXTENSION_PATH = File.join(File.dirname(__FILE__), '../../../build')

RSpec.configure do |config|
  config.color = true
  config.add_formatter :documentation

  config.before(:all) do
    @browser_helper = Managers::Browser.new(EXTENSION_PATH)
  end
end

RSpec.shared_context 'with_browser' do
  before(:all) do
    # Spawn new browser for each with_browser context
    @browser = @browser_helper.new_browser

    # Goto popup
    browser.goto popup_url
  end

  after(:all) do
    browser.close
  end
end

def browser
  @browser
end

def extension_url
  "chrome-extension://#{EXTENSION_ID}/"
end

def popup_url
  "#{extension_url}frontend/popup.html"
end
